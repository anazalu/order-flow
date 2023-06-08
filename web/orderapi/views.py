from django.shortcuts import render

# Create your views here.
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Customer, Product, Order, Item

@csrf_exempt
def customer_list(request):
    if request.method == 'GET':
        customers = Customer.objects.all()
        customer_data = [{'customer_id': customer.customer_id, 'last_name': customer.last_name, 'email ': customer.email} for customer in customers]
        return JsonResponse({'customers': customer_data})
    elif request.method == 'POST':
        customer_id = request.POST.get('customer_id')
        last_name = request.POST.get('last_name')
        email = request.POST.get('email')
        customer = Customer.objects.create(title=title, author=author, publication_date=publication_date)
        return JsonResponse({'message': 'Customer created successfully.'})
      
