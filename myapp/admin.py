from django.contrib import admin
from .models import TodoItem
from .models import MenuItem

admin.site.register(TodoItem)
admin.site.register(MenuItem)
#run --> python manage.py makemigrations everytime you make changes to database models then run --> python manage.py migrate to apply those changes to the database
