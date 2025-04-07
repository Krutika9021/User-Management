resource "null_resource" "deploy_frontend_to_netlify" {
  provisioner "local-exec" {
    command = <<EOT
      npm install netlify-cli -g
      netlify deploy --dir=${var.frontend_directory} --site=${var.netlify_site_id} --auth=${var.netlify_auth_token} --prod
    EOT
  }
}
