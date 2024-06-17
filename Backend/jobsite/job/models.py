from django.db import models
from django.utils.translation import gettext_lazy as _

# Create your models here.

class Job(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    salary_from = models.DecimalField(max_digits=10, decimal_places=2)
    salary_to = models. DecimalField(max_digits=10, decimal_places=2)
    experience = models.IntegerField()
    skills = models.CharField(max_length=255)
    is_deleted = models.BooleanField(default=False)

    class Meta:
        db_table = 'job_job'
        verbose_name = ('job')
        verbose_name_plural = _('jobs')

    def __str__(self):
        return str(self.title)
