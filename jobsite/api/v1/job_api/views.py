from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from api.v1.auth.pagination import StandardResultSetPagination
from django.shortcuts import get_object_or_404
from django.urls import reverse
from api.v1.job_api.serializers import JobListSerializer, JobSerializer
from job.models import Job


# job crud starts here
@api_view(["POST"])
def create_job(request):   
    serializer = JobSerializer(data=request.data)
    if serializer.is_valid():
        title = serializer.validated_data['title']
        description = serializer.validated_data['description']
        salary_from = serializer.validated_data['salary_from']
        salary_to = serializer.validated_data['salary_to']
        experience = serializer.validated_data['experience']
        skills = serializer.validated_data['skills']
        company = serializer.validated_data['company']

        if not Job.objects.filter(title=title,company=company).exists():
            Job(                    
                title = title, 
                description = description,
                salary_from = salary_from, 
                salary_to = salary_to, 
                experience = experience, 
                skills = skills, 
                company = company
            ).save()
            response_data = {
                "status": 200,
                "title": "Successfully Created",
                "message": "Job created successfully."
            }
        else:               
            response_data = {
                "status": 400,
                "stable": "true",
                "title": "Already exists",
                "message": "Job already exists",                        
            }
    else:        
        response_data = {
            "stable": "true",
            "status": 400,
            "title": "Form validation error",
            "message": "Validation Error",               
        }
    return Response(response_data)


@api_view(["GET"])
def jobs(request):
    instances = Job.objects.filter(is_deleted=False)
    paginator = StandardResultSetPagination()
    paginated_jobs = paginator.paginate_queryset(instances, request)
    serializer = JobListSerializer(paginated_jobs, many=True)    
    response_data = {
        "status": 200,
        "message": "Jobs List",
        "data": serializer.data,
        "meta": {
            "count": paginator.page.paginator.count,
            "pagination": {
                "next": paginator.get_next_link(),
                "previous": paginator.get_previous_link(),
            }
        }
    }    
    return Response(response_data)


@api_view(["PUT"])
def edit_job(request, pk):
    instance = get_object_or_404(Job.objects.filter(pk=pk, is_deleted=False))
    serializer = JobListSerializer(instance=instance,data=request.data,partial=True)
    if serializer.is_valid():
        data = serializer.save()
        data.save()
        response_data = {
            "status": "true",
            "redirect" : "true",
            "title": "Successfully Updated",
            "message": "Job updated successfully.",    
        }
    else:
        response_data = {
            "stable": "true",
            "status": "false",
            "message": "Validation Error",
            "title": "Form validation error"  
        }
    return Response(response_data)
    

@api_view(["GET"])
def job(request, pk):
    try:
        job = Job.objects.get(pk=pk, is_deleted=False)
    except Job.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    serializer = JobSerializer(job)
    return Response(serializer.data)


@api_view(["PUT"])
def delete_job(request,pk):
    instance = get_object_or_404(Job.objects.filter(pk=pk,is_deleted=False))  
    Job.objects.filter(pk=pk).update(is_deleted=True,title=instance.title + "_deleted_" )    
    response_data = {
        "status" : 200,        
        "title" : "Successfully Deleted",
        "message" : "Job Successfully Deleted."
    }
    return Response(response_data)