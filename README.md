Discourse
=======


Discourse is a fullstack chat application created to allow multiple people
chat within the same session. It is built with Django-channels, Django Rest
Framework and React.





Running this project without Docker
-----

```
git clone https://github.com/mamihretu/Doom.git
cd requirements
pip install -r base.txt # or local.txt if django_debug_toolbar is desired
cd ..
python manage.py runserver

```




Running this project with Docker
-----

```
# This instructions will take a few minutes to complete on their first run

docker-compose -f local.yml build
docker-compose -f local.yml up

```









