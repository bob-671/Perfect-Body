from django import forms
from .models import MenuItem, TodoItem

class TodoItemForm(forms.ModelForm):
    class Meta: 
        model = TodoItem
        fields = ['title', 'completed'] #to include ALL fields, use fields = '__all__'