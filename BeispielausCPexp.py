#immerueber Eingabeauffordung ausfuehren!!

import numpy as np
import matplotlib.pyplot as plt
import matplotlib.gridspec as gridspec  # for unequal plot boxes
from linfit import linfit


t = np.array([0., 2., 4., 6., 8., 10., 12., 14., 16.])
N = np.array([82., 56., 37., 26., 18., 11., 9., 5., 3.])
dN = np.array([1., 1., 1., 1., 1., 1., 1., 1., 1.])


y = np.log(N)
dy = dN/N
fit, cvm, info = linfit(t, y, sigmay=dy, relsigma=False, return_all=True)
a, b = fit[0], fit[1]
tau = -1.0/a
N0 = np.exp(b)
dfit = [np.sqrt(cvm[i,i]) for i in range(2)]
da, db = dfit[0], dfit[1]
dtau = da/(a*a)
dN0 = np.exp(b)*db
tm = 0.05*(t.max()-t.min())
tfit = np.linspace(t.min()-tm, t.max()+tm, 50) 
Nfit = N0*np.exp(-tfit/tau)
fig = plt.figure(1, figsize=(10, 3.5))
ax1 = fig.add_subplot(1,2,1)
ax2 = fig.add_subplot(1,2,2)
ax2.set_yscale("log")
ax2.set_ylim(1., 100.)
for ax in [ax1, ax2]:
    ax.errorbar(t, N, yerr=dN, fmt='ro', ecolor='k', ms=3)
    ax.plot(tfit, Nfit, '-', color="gray", zorder=-1)
    ax.set_xlim(0, 20)
    ax.set_xlabel('t')
    ax.set_ylabel('N')
    ax.text(0.95, 0.95,"$\\tau = {0:0.1f}\pm{1:0.1f}$\n$N_0 = {2:0.2f}\pm{3:0.2f}$"
         .format(tau, dtau, N0, dN0), fontsize=12, 
         ha='right', va='top', transform=ax.transAxes)
plt.show()