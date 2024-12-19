As an evidence of the correct operation of the cache, the next postman collection with the endpoints configured with the cache cache middleware was tested with 5 iterations for each endpoint:
![postman collection config](./img/collection-run-config.png)

### Results on first iteration:
![cache test it.1](./img/c_iteration_1.png)
![cache test it.1.2](./img/c_iteration2.png)

### Results on second iteration:
![cache test it.2](./img/c_iteration_3.png)
![cache test it.2.2](./img/c_iteration_4.png)

### Results on third iteration:
![cache test it.3](./img/c_iteration_5.png)
![cache test it.3.2](./img/c_iteration_6.png)

### Results on Fourth iteration:

![cache test it.4](./img/c_iteration_7.png)
![cache test it.4](./img/c_iteration_8.png)

### Results on Fifth iteration:
![cache test it.5](./img/c_iteration_9.png)
![cache test it.5.2](./img/c_iteration_10.png)

As we can se, the memory cache hepls to decrease the response time in most of iteration after the first iteration (which is served with the API).