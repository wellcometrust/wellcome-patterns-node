module "ecs_events_exhibitions_iam" {
  source = "git::https://github.com/wellcometrust/terraform.git//ecs_iam?ref=v1.0.4"
  name   = "events_exhibitions"
}
