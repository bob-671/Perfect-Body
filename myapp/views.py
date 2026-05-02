from django.shortcuts import render, HttpResponse
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import login, authenticate
from django.http import HttpResponse
from django.views import View
from django.http import JsonResponse
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework import status
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from rest_framework.permissions import AllowAny

def hello_api(request):
    return JsonResponse({
        "message": "Hello from Django backend!"
    })


@api_view(['POST'])
@authentication_classes([])
@permission_classes([AllowAny])
def login_view(request):
    email = request.data.get("email")
    password = request.data.get("password")

    if not email or not password:
        return Response({"error": "Missing fields"}, status=400)

    # First find the user by email
    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return Response({"error": "Invalid credentials"}, status=400)
    
    # Then check the password
    if user.check_password(password):
        return Response({
            "message": "Login successful",
            "username": user.username
        })
    else:
        return Response({"error": "Invalid credentials"}, status=400)
    
@api_view(['POST'])
@authentication_classes([])
@permission_classes([AllowAny])
def register(request):
    username = request.data.get("username")
    email = request.data.get("email")
    password = request.data.get("password")
    first_name = request.data.get("first_name", "")
    last_name = request.data.get("last_name", "")
    age = request.data.get("age")
    gender = request.data.get("gender")

    if not username or not password or not email:
        return Response({"error": "Missing required fields"}, status=400)

    if User.objects.filter(username=username).exists():
        return Response({"error": "User already exists"}, status=400)
    
    if User.objects.filter(email=email).exists():
        return Response({"error": "Email already exists"}, status=400)

    # Validate gender
    valid_genders = ['M', 'F', 'O', 'N']
    if gender and gender not in valid_genders:
        return Response({"error": "Invalid gender value"}, status=400)

    # Create user
    user = User.objects.create_user(
        username=username,
        email=email,
        password=password,
        first_name=first_name,
        last_name=last_name
    )
    
    # Store age and gender in user profile (instead of custom user model)
    # You could also use Django's user profile or a custom model

    return Response({
        "message": "User created successfully",
        "user": {
            "username": user.username,
            "email": user.email,
            "first_name": user.first_name,
            "last_name": user.last_name
        }
    })
# def home(request):
#     return render(request, "home.html")

# def todos(request):
#     items = TodoItem.objects.all()

#     if request.method == "POST":
#         form = TodoItemForm(request.POST)
#         if form.is_valid():
#             form.save()
#             form = TodoItemForm()  # reset form after submit
#     else:
#         form = TodoItemForm()

#     return render(request, "todos.html", {
#         "todos": items,
#         "form": form
#     })
    
# def register(request):
#     if request.method == "POST":
#         form = UserCreationForm(request.POST)
#         if form.is_valid():
#             form.save()
            
#     else:
#         form = UserCreationForm()

#     return render(request, "registration/register.html", {"form": form})
        
    
 