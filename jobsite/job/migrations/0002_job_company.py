# Generated by Django 5.0.4 on 2024-06-17 23:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('job', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='job',
            name='company',
            field=models.CharField(default='wipro', max_length=255),
            preserve_default=False,
        ),
    ]
