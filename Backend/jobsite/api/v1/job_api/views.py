from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from job.models import Job
from .serializers import JobSerializer
from api.v1.auth.pagination import StandardResultSetPagination


@api_view(['GET'])
def job_list(request):
    jobs = Job.objects.filter(is_deleted = False)
    paginator = StandardResultSetPagination()
    result_page = paginator.paginate_queryset(jobs, request)
    serializer = JobSerializer(result_page, many=True)
    return paginator.get_paginated_response(serializer.data)

@api_view(['POST'])
def job_create(request):
    serializer = JobSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def job_detail(request, pk):
    try:
        job = Job.objects.get(pk=pk, is_deleted=False)
    except Job.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    serializer = JobSerializer(job)
    return Response(serializer.data)

@api_view(['PUT'])
def job_update(request, pk):
    try:
        job = Job.objects.get(pk=pk, is_deleted=False)
    except Job.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = JobSerializer(job, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def job_delete(request, pk):
    try:
        job = Job.objects.get(pk=pk, is_deleted=False)
    except Job.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    job.is_deleted = True
    job.save()
    return Response(status=status.HTTP_204_NO_CONTENT)