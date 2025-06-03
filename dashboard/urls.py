"""
Urls routing for dashboard app
"""

from django.urls import path
from django.views.generic import TemplateView

urlpatterns = [
    path("",                  TemplateView.as_view(template_name="login.html"),    name="login"),
    path("register/",         TemplateView.as_view(template_name="register.html"), name="register"),
    path("homepage/",         TemplateView.as_view(template_name="homepage.html"), name="homepage"),
    path("homepage/card_list/", TemplateView.as_view(template_name="card.html"),   name="card_list"),
]