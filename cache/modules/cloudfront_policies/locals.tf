locals {
  toggles_cookies        = ["toggles", "toggle_*"]
  userpreference_cookies = ["WC_*", "CookieControl"]
  ga_cookies             = ["_ga"]

  one_minute = 60
  one_hour   = 60 * local.one_minute
  one_day    = 24 * local.one_hour
  one_year   = 365 * local.one_day
}
