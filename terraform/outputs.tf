
output "graphql_backend_url" {
  value = google_cloudfunctions_function.graphql_backend.https_trigger_url
}
