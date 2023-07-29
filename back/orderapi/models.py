from django.db import models
from django.contrib.auth.models import AbstractBaseUser, UserManager, User

class Product(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=8, decimal_places=2)
    image_url = models.CharField(max_length=255)
    description = models.CharField(max_length=255)
    class Meta:
        db_table = "products"

class Order(models.Model):
    id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(User, db_column='user_id', on_delete=models.CASCADE)
    status = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True, blank=True)
    class Meta:
        db_table = "orders"

class CartItem(models.Model):
    id = models.AutoField(primary_key=True)
    order_id = models.ForeignKey(Order, db_column='order_id', on_delete=models.CASCADE)
    product_id = models.ForeignKey(Product, db_column='product_id', on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    class Meta:
        db_table = "orderitems"
