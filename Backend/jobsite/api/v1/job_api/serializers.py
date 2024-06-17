from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from job.models import Job

class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = '__all__'