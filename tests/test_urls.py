from django.urls import reverse, resolve
# from django.urls import path

class TestUrls: 
# here, you are checking if the path's view name is content
    def test_post_content_url(self):  
        path = reverse('content', kwargs={'pk':1})  
        assert resolve(path).view_name == "content"  # here you are checking if the path's view name is content
