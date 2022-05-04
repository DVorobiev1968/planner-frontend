server {
        server_name testedo.rdturbo.ru www.testedo.rdturbo.ru;

        listen 80;
        listen [::]:80;
        index index.html index.htm;

	location /planning-front-end/ {
        	root /var/www/testedo.rdturbo.ru/html/planning-front-end;
	}

	location /api/ {
		client_max_body_size 32M;

        	if ($request_method = 'OPTIONS') {
	            add_header 'Access-Control-Allow-Origin' '*' always;
        	    add_header 'Access-Cotnrol-Allow-Credentials' 'true';
	            add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS, PUT, DELETE';
        	    add_header 'Access-Control-Allow-Headers' 'Origin,Content-Type,Accept,Authorization,If-Modified-Since,Pragma';
	            add_header 'Access-Control-Max-Age' 1728000;
        	    add_header 'Content-Type' 'text/plain charset=UTF-8';
	            add_header 'Content-Length' 0;
        	    return 204;
	        }

        	if ($request_method = 'POST') {
                	add_header 'Access-Control-Allow-Origin' '*' always;
	                add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
        	        add_header 'Access-Control-Allow-Headers' 'Origin,Referer,DNT,User-Agent,X-Requested-With,If-Modified-Since,Content-Type,Range';
                	add_header 'Access-Control-Expose-Headers' 'Content-Length,Content-Range';
	        }

	
        	if ($request_method = 'GET') {
	               	add_header 'Access-Control-Allow-Origin' '*' always;
        	        add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
                	add_header 'Access-Control-Allow-Headers' 'Origin,Referer,DNT,User-Agent,X-Requested-With,If-Modified-Since,Content-Type,Range';
	                add_header 'Access-Control-Expose-Headers' 'Content-Length,Content-Range';
        	}
		
		proxy_set_header Host $host;
		proxy_set_header X-Real-IP $remote_addr;
		proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
		proxy_pass http://testedo.rdturbo.ru:8090/api/;
		proxy_read_timeout 120s;
	}

}
