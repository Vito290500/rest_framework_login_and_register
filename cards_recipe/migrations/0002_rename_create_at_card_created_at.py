# Generated by Django 5.2.1 on 2025-06-04 10:47

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('cards_recipe', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='card',
            old_name='create_at',
            new_name='created_at',
        ),
    ]
