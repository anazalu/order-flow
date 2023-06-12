import pytest
from ..web.orderapi.models import Customer


@pytest.mark.django_db
def test_customer_create():
    # Create dummy data
    expected_customer_id: int = 1000
    expected_last_name: str = 'Ali'
    expected_email: str = 'ali@yahoo.com'
    customer = Customer.objects.create(
        customer_id = expected_customer_id,
        last_name = expected_last_name,
        email = expected_email
    )

    # Assert the dummy data saved as expected
    assert customer.customer_id == expected_customer_id
    assert customer.last_name == expected_last_name
    assert customer.email == expected_email
