"""
Admin settings for cards app
"""

from django.contrib import admin
from .models import *


@admin.register(Card)
class CardAdmin(admin.ModelAdmin):
    list_display = ('title', 'owner', 'category', 'created_at')
    list_filter = ('category', 'created_at', 'owner')
    search_fields = ('title', 'description', 'owner__username')