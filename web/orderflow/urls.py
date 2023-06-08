"""orderflow URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from .views import customer_list, product_list, order_list, item_list

urlpatterns = [
    path('admin/', admin.site.urls),
    path('customers/', customer_list, name='customer-list'),
    path('products/', product_list, name='product-list'),
    path('orders/', order_list, name='order-list'),
    path('items/', item_list, name='item-list'),
]
