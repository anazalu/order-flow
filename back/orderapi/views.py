from http.client import NOT_FOUND
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
import jwt
from django.shortcuts import get_object_or_404
from .models import Product, User, Order, CartItem
from .serializers import ProductSerializer, UserSerializer, OrderSerializer, CartItemSerializer


def get_or_create_current_order(token: str) -> int:
    # decode the JWT token and extract the User ID
    decoded_token = jwt.decode(token, options={'verify_signature': False})
    user_id = decoded_token.get('user_id')

    # filter the queryset to include orders only for the User ID
    queryset = Order.objects.filter(user_id=user_id)

    # if there is an existing order, get the latest order based on the highest order ID
    if queryset.exists():
        latest_order_id = queryset.order_by('-id').values_list('id', flat=True).first()
        return latest_order_id

    # if there is no existing order, create a new order for the user
    try:
        user = User.objects.get(id=user_id)
    except User.DoesNotExist:
        raise NOT_FOUND('User not found')
    order_data = {
        'user_id': user,
        'status': 'new',
    }
    order = Order.objects.create(**order_data)
    return order.id


class UserRegistrationView(APIView):
    authentication_classes = []  # Disable authentication
    permission_classes = [AllowAny]  # Allow any user to access the endpoint

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ProductList(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class ProductDetail(generics.RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

# class LatestOrder(generics.ListAPIView):
#     serializer_class = OrderSerializer

#     def get_queryset(self):
#         token = self.request.headers.get('Authorization', '').split(' ')[1]
#         order_id = get_or_create_current_order(token)
#         queryset = Order.objects.filter(id=order_id)
#         return queryset
    
class LatestOrder(generics.RetrieveAPIView):  # Change to RetrieveAPIView
    serializer_class = OrderSerializer

    def get_object(self):
        token = self.request.headers.get('Authorization', '').split(' ')[1]
        order_id = get_or_create_current_order(token)
        try:
            queryset = Order.objects.get(id=order_id)  # Use get() instead of filter()
        except Order.DoesNotExist:
            raise NOT_FOUND('Order not found')
        return queryset

class CartItemCreateList(generics.ListCreateAPIView):
    queryset = CartItem.objects.all()
    serializer_class = CartItemSerializer
    # permission_classes = [IsAuthenticated]

    def get_queryset(self):
        token = self.request.headers.get('Authorization', '').split(' ')[1]
        order_id = get_or_create_current_order(token)
        return CartItem.objects.filter(order_id=order_id)
    
    def perform_create(self, serializer):
        token = self.request.headers.get('Authorization', '').split(' ')[1]
        order_id = get_or_create_current_order(token)
        order = Order.objects.get(id=order_id)

        # Check if an existing cart item with the specified product_id exists
        product_id = self.request.data.get('product_id')
        existing_cart_item = CartItem.objects.filter(order_id=order_id, product_id=product_id).first()
        if existing_cart_item:
            # Return a response indicating that the cart item already exists
            return Response({'error': 'Cart item already exists'}, status=status.HTTP_400_BAD_REQUEST)

        # If no existing cart item, create the new cart item
        serializer.save(order_id=order)

class CartItemDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = CartItem.objects.all()
    serializer_class = CartItemSerializer
