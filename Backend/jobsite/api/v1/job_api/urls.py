# backend/api/v1/job_api/urls.py

from django.urls import path
from . import views

app_name = 'job_api'

urlpatterns = [
    path('jobs/', views.job_list, name='job-list'),
    path('jobs/create/', views.job_create, name='job-create'),
    path('jobs/<int:pk>/', views.job_detail, name='job-detail'),
    path('jobs/<int:pk>/update/', views.job_update, name='job-update'),
    path('jobs/<int:pk>/delete/', views.job_delete, name='job-delete'),
]
