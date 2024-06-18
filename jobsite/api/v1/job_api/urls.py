# backend/api/v1/job_api/urls.py

from django.urls import path
from . import views

app_name = 'job_api'

urlpatterns = [
    path('jobs/', views.jobs, name='job-list'),
    path('jobs/create/', views.create_job, name='job-create'),
    path('jobs/<int:pk>/', views.job, name='job-detail'),
    path('jobs/<int:pk>/edit/', views.edit_job, name='job-edit'),
    path('jobs/<int:pk>/delete/', views.delete_job, name='job-delete'),
]
