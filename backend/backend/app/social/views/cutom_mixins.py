class FilterPostMixin:
    def filter_posts(self, posts):
        if "search" in self.request.query_params.keys():
            posts_including_search = []
            search = self.request.query_params["search"].lower()
            for item in posts:
                if item.user and (search in item.content.lower() or search in item.user.username.lower()):
                    posts_including_search.append(item)
            return posts_including_search
        return posts.order_by("-created")
