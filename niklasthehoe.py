import numpy as np
from numpy import pi
#print(pi)
#einfuehrung
a = np.arange(15).reshape(3, 5)
#print(a.itemsize)
b = np.array([2,3,4])
#print(b)
b = np.array([(1.5,2,3), (4,5,6)])
#print(b)
c = np.array( [ [1,2], [3,4] ], dtype=complex )
#print(c)
d = np.ones( (2,3,4), dtype=np.int16 )   
#print(d)

#print(np.linspace( 0, 2, 9 ))
x = np.linspace( 0, 2*pi, 100 )
#print(np.sin(x))
#print arrays

a = np.array( [20,30,40,50] )
b = np.arange( 4 )
#print(b)
c = a-b
#print(c)
#print(b**2)
#print(10*np.sin(a))

#print(a<35)

#matrixmultiplikation
A = np.array( [[1,1],[0,1]] )
B = np.array( [[2,0],[3,4]] )
print(A*B)
print(A.dot(B))

