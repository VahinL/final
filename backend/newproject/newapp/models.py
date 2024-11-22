from django.db import models

# Create your models here.
from django. contrib. auth.models import AbstractUser

class User(AbstractUser):
    phone_number = models.IntegerField()
    gender=models.CharField(max_length=30)


class Task(models.Model):
    user1 = models.ForeignKey(User, on_delete=models.CASCADE)
    task_name = models.CharField(max_length=30)
    task_description = models.TextField()
    status = models.IntegerField(default=0)