terraform {
  required_version = "~> 1.1.2"
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

data "azurerm_container_registry" "registry" {
  name                = data.terraform_remote_state.service.outputs.container_registry_name
  resource_group_name = data.terraform_remote_state.service.outputs.resource_group_name
}

data "azurerm_resource_group" "root" {
  name = data.terraform_remote_state.service.outputs.resource_group_name
}

locals {
  common_name             = "time-tracker-ui"
  environment             = terraform.workspace
  service_name            = "${local.common_name}-${local.environment}"
  create_app_service_plan = true
  service_plan_kind       = "Linux"
}

module "ui" {
  source                   = "git@github.com:ioet/infra-terraform-modules.git//azure-app-service?ref=tags/v0.0.5"
  app_service_name         = local.service_name
  create_app_service_plan  = local.create_app_service_plan
  docker_image_name        = var.docker_image_name
  docker_image_namespace   = data.azurerm_container_registry.registry.login_server
  docker_registry_password = data.azurerm_container_registry.registry.admin_password
  docker_registry_url      = data.azurerm_container_registry.registry.login_server
  docker_registry_username = data.azurerm_container_registry.registry.admin_username
  location                 = data.azurerm_resource_group.root.location
  resource_group_name      = data.azurerm_resource_group.root.name
  service_plan_kind        = local.service_plan_kind
  service_plan_name        = local.service_name
  service_plan_size        = var.service_plan_size
  service_plan_tier        = var.service_plan_tier

}