variable "docker_image_name" {
  type        = string
  description = "Specifies the docker image name that is stored in a private container registry like ACR (Azure Container Registry)."
  sensitive   = true
}

variable "service_plan_size" {
  default     = "S1"
  type        = string
  description = "Specifies the size of the service plan. This variable format is: Tier (letter) + Size (number). Size could be: 1 = Small (1 Core 1.75GB RAM), 2 = Medium (2 Core 3.5 GB RAM), 3 = Large (4 Core 7GB RAM)"
}

variable "service_plan_tier" {
  default     = "Standard"
  type        = string
  description = "Specifies the tier of the service plan. Tier is the pricing plan of the service plan resource."
}

