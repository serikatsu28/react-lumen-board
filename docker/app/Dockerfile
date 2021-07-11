FROM php:7.4-apache


COPY php.ini /usr/local/etc/php/conf.d/
COPY 000-default.conf /etc/apache2/sites-enabled/

RUN cd /usr/bin && curl -s http://getcomposer.org/installer | php && ln -s /usr/bin/composer.phar /usr/bin/composer

RUN apt-get -y update \
&& apt-get install -y \
git \
zip \
unzip \
vim \
libonig-dev \
libpng-dev \
libpq-dev \
curl \
gnupg \
&& docker-php-ext-install pdo_mysql
RUN curl -sL https://deb.nodesource.com/setup_11.x | bash -
RUN apt-get install -y nodejs
RUN npm install npm@latest -g
RUN cd /etc/apache2/mods-enabled \
    && ln -s ../mods-available/rewrite.load
