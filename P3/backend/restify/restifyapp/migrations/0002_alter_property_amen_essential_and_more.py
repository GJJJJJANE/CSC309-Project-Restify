# Generated by Django 4.1.7 on 2023-03-12 20:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('restifyapp', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='property',
            name='amen_essential',
            field=models.CharField(choices=[('wi', 'Wifi'), ('hw', 'Hot Water'), ('ai', 'Air Conditioning')], max_length=50),
        ),
        migrations.AlterField(
            model_name='property',
            name='amen_indoor',
            field=models.CharField(choices=[('tv', 'TV'), ('pw', 'Personal Workspace'), ('li', 'Light')], max_length=50),
        ),
        migrations.AlterField(
            model_name='property',
            name='amen_outdoor',
            field=models.CharField(choices=[('pa', 'Parking Space'), ('bb', 'BBQ Grill'), ('ba', 'Backyard')], max_length=50),
        ),
        migrations.AlterField(
            model_name='property',
            name='photos',
            field=models.URLField(),
        ),
    ]
