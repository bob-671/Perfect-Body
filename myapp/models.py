from django.db import models

#ORM = Object Relational Mapper
class MenuItem(models.Model):
    name = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=5, decimal_places=2)
    
class TodoItem(models.Model):
    title = models.CharField(max_length=255)
   
    completed = models.BooleanField(default=False)

    