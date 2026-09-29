#include <stdio.h>
#include <stdlib.h>
#include <pthread.h>
#include <unistd.h>
 
void *handleClient(void *arg)
{
   int id = *(int *)arg;
 
   printf("Thread %d: Handling client request...\n", id);
 
   sleep(2); // Simulate processing time
 
   printf("Thread %d: Request completed.\n", id);
 
   pthread_exit(NULL);
}
 
int main()
{
   int n, i;
 
   printf("Enter number of client requests: ");
   scanf("%d", &n);
 
   pthread_t threads[n];
   int id[n];
 
   for (i = 0; i < n; i++)
   {
       id[i] = i + 1;
 
       if (pthread_create(&threads[i], NULL, handleClient, &id[i]) != 0)
       {
           printf("Error creating thread %d\n", i + 1);
           return 1;
       }
   }
 
   for (i = 0; i < n; i++)
   {
       pthread_join(threads[i], NULL);
   }
 
   printf("\nAll client requests have been processed.\n");
 
   return 0;
}

