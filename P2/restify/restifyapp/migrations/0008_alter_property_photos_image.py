# Generated by Django 4.2 on 2023-04-16 00:11

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('restifyapp', '0007_alter_property_photos'),
    ]

    operations = [
        migrations.AlterField(
            model_name='property',
            name='photos',
            field=models.ImageField(upload_to='property_images'),
        ),
        migrations.CreateModel(
            name='Image',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('photos', models.ImageField(upload_to='property_images')),
                ('property_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='photo', to='restifyapp.property')),
            ],
        ),
    ]
