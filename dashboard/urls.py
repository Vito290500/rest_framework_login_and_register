"""
Urls routing for dashboard app
"""

from django.urls import path
from django.views.generic import TemplateView

urlpatterns = [
    path("",    TemplateView.as_view(template_name="login.html")),
    path("register/", TemplateView.as_view(template_name="register.html")),
    path("homepage/", TemplateView.as_view(template_name="homepage.html")),
]   