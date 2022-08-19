terraform {
  required_version = "~> 1"
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 2.90"
    }
  }

  backend "azurerm" {
    resource_group_name  = "ioet-infra-tf-state"
    storage_account_name = "timetrackertfstate"
    container_name       = "time-tracker-tf-state"
    key                  = "time-tracker-ui.tfstate"
  }

}

provider "azurerm" {
  features {}
  skip_provider_registration = true
}

data "terraform_remote_state" "service" {
  backend   = "azurerm"
  workspace = terraform.workspace
  config = {
    resource_group_name  = "ioet-infra-tf-state"
    storage_account_name = "timetrackertfstate"
    container_name       = "time-tracker-tf-state"
    key                  = "this.tfstate"
  }
}

locals {
  common_name             = "time-tracker-service"
  environment             = terraform.workspace
  service_name            = "${local.common_name}-${local.environment}"
  create_app_service_plan = false
  service_plan_kind       = "Linux"
  image_name              = "timetracker_ui"
}

module "ui" {
  #source = "../../infra-terraform-modules/azure-app-service"
  source                   = "git@github.com:ioet/infra-terraform-modules.git//azure-app-service?ref=tags/v0.0.13"
  app_service_name         = "${local.service_name}-ui"
  create_app_service_plan  = local.create_app_service_plan
  docker_image_name        = "${local.image_name}:${var.image_tag}"
  docker_image_namespace   = data.terraform_remote_state.service.outputs.container_registry_login_server
  docker_registry_password = data.terraform_remote_state.service.outputs.container_registry_admin_password
  docker_registry_url      = data.terraform_remote_state.service.outputs.container_registry_login_server
  docker_registry_username = data.terraform_remote_state.service.outputs.container_registry_admin_username
  location                 = data.terraform_remote_state.service.outputs.container_registry_location
  resource_group_name      = data.terraform_remote_state.service.outputs.resource_group_name
  service_plan_name        = local.service_name
  service_plan_size        = var.service_plan_size
  service_plan_tier        = var.service_plan_tier
  hostname                 = "ui"
  dns_zone_name            = data.terraform_remote_state.service.outputs.subdomain
}
