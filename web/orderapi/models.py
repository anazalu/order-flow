from django.db import models

# Create your models here.
class Customer(models.Model):
    customer_id = models.IntegerField(primary_key=True)
    last_name = models.CharField(max_length=255)
    email = models.CharField(max_length=255)
    # def to_dict(self):
    #     return {"customer_id": self.customer_id, "last_name": self.last_name, "email": self.email}
    class Meta:
        db_table = "customers"

class Product(models.Model):
    product_id = models.IntegerField(primary_key=True)
    product_name = models.CharField(max_length=255)
    price = models.IntegerField()
    # def to_dict(self):
    #     return {"product_id": self.product_id, "product_name": self.product_name, "price": self.price}
    class Meta:
        db_table = "products"

class Order(models.Model):
    order_id = models.IntegerField(primary_key=True)
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    stage = models.CharField(max_length=16)
    # def to_dict(self):
    #     return {"order_id": self.order_id, "customer_id": self.customer_id.to_dict(), "stage": self.stage}
    class Meta:
        db_table = "orders"

class Item(models.Model):
    item_id = models.IntegerField(primary_key=True)
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField()
    class Meta:
        db_table = "items"
