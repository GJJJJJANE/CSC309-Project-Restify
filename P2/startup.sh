
# make sure you are in P2
# chmod +x startup.sh

# run this to set up venv! the virtual environment is not pushed to repository

# set up
cd restify

# Create virtual environment
python3 -m venv venv
source venv/bin/activate

# Install Django and Django REST framework into the virtual environment
pip install django
pip install djangorestframework

# # start new project
# django-admin startproject restify . 
# cd restify
# django-admin startapp restifyapp

# come back to the outer dir
# cd ..

# run migrations
python3 manage.py makemigrations
python3 manage.py migrate

# don't push the venv
deactivate
git init
echo 'venv' > .gitignore
pip freeze > requirements.txt
git add requirements.txt

# # activate it again
# cd ..
# source restify/venv/bin/activate