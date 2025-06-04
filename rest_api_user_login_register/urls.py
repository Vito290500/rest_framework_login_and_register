"""
ROOT endpoint config
"""
from django.contrib import admin
from django.urls import path, include
from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularSwaggerView,
    SpectacularRedocView,
)

urlpatterns = [
    path("admin/", admin.site.urls),

    path('api/schema/', SpectacularAPIView.as_view(), name='api-schema'),
    path('api/docs/', SpectacularSwaggerView.as_view(url_name="api-schema"),name="api-docs", ),

    # --- app endpoints ---
    path("api/auth/", include("accounts.urls")),
    path("api/", include("cards_recipe.urls")),
    path("", include("dashboard.urls")),

]