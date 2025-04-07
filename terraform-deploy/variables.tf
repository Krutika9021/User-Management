variable "mongodb_uri" {
  description = "MongoDB connection string"
  type        = string
}

variable "frontend_directory" {
  description = "Path to the frontend build folder"
  type        = string
}

variable "netlify_site_id" {
  description = "Netlify Site ID"
  type        = string
}

variable "netlify_auth_token" {
  description = "Netlify personal access token"
  type        = string
}

variable "repo_url" {
  description = "GitHub Repository URL"
  type        = string
}

