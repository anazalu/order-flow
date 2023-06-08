from django.shortcuts import render

# Create your views here.
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Customer, 

@csrf_exempt
def customer_list(request):
    if request.method == 'GET':
        customers = Customer.objects.all()
        book_data = [{'title': book.title, 'author': book.author, 'publication_date': book.publication_date} for customer in customers]
        return JsonResponse({'customers': customer_data})
    elif request.method == 'POST':
        title = request.POST.get('title')
        author = request.POST.get('author')
        publication_date = request.POST.get('publication_date')
        book = Book.objects.create(title=title, author=author, publication_date=publication_date)
        return JsonResponse({'message': 'Book created successfully.'})
      
