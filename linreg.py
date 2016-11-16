import numpy as np
import matplotlib.pyplot as plt
import matplotlib.gridspec as gridspec  # for unequal plot boxes
from linfit import linfit
x = np.array([0, 1, 2, 3])
y = np.array([-1, 0.2, 0.9, 2.1])
fit, cvm = linfit(x, y, relsigma=True)
dfit = [np.sqrt(cvm[i,i]) for i in range(2)]

xfit = np.array([-0.2, 3.2])
yfit = fit[0]*xfit + fit[1]
plt.plot(x, y, 'ro', label="data")
plt.plot(xfit, yfit, zorder=-1, label="ax+b")
plt.text(-0.4, 1.1, "a={0:0.2f}\nb={1:0.2f}"
         .format(fit[0], fit[1]), fontsize=12)
plt.legend(loc="upper left")
plt.xlabel('x')

print(u"slope = {0:0.2f} \xb1 {1:0.2f}".format(fit[0], dfit[0]))
print(u"y-intercept = {0:0.2f} \xb1 {1:0.2f}".format(fit[1], dfit[1]))
plt.show()