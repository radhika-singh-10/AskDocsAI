
provider "google" {
  project = var.project_id
  region  = var.region
}

resource "google_storage_bucket" "contract_bucket" {
  name          = "contractinsightsai-bucket-${var.project_id}"
  location      = var.region
  force_destroy = true
}

resource "google_cloudfunctions_function" "graphql_backend" {
  name        = "contract-insights-api"
  runtime     = "nodejs20"
  entry_point = "handler"
  source_archive_bucket = google_storage_bucket.contract_bucket.name
  source_archive_object = "contract-insights-api.zip"
  trigger_http = true
  available_memory_mb = 512
  environment_variables = {
    OPENAI_API_KEY = var.openai_api_key
  }
}
