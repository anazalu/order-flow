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
        customer = Customer.objects.create(customer_id=customer_id, last_name=last_name, email=email)
        return JsonResponse({'message': 'Customer created successfully.'})
      
@csrf_exempt
def product_list(request):
    if request.method == 'GET':
        products = Product.objects.all()
        product_data = [{'product_id': product.product_id, 'product_name': product.product_name, 'price': product.price} for product in products]
        return JsonResponse({'products': product_data})
    elif request.method == 'POST':
        product_id = request.POST.get('product_id')
        product_name = request.POST.get('product_name')
        price = request.POST.get('price')
        product = Product.objects.create(product_id=product_id, product_name=product_name, price=price)
        return JsonResponse({'message': 'Product created successfully.'})
    
@csrf_exempt
def order_list(request):
    if request.method == 'GET':
        orders = Order.objects.all()
        order_data = [{'order_id': order.order_id, 'customer_id': order.customer_id, 'stage': order.stage} for order in orders]
        return JsonResponse({'orders': order_data})
    elif request.method == 'POST':
        order_id = request.POST.get('order_id')
        customer_id = request.POST.get('customer_id')
        stage = request.POST.get('stage')
        order = Order.objects.create(order_id=order_id, customer_id=customer_id, stage=stage)
        return JsonResponse({'message': 'Order created successfully.'})
    
