# Generated by Django 5.2.1 on 2025-06-04 13:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cards_recipe', '0002_rename_create_at_card_created_at'),
    ]

    operations = [
        migrations.AddField(
            model_name='card',
            name='items',
            field=models.JSONField(blank=True, default=list, help_text='Elenco di elementi associati alla Card'),
        ),
    ]
