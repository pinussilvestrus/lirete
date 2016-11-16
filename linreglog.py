import numpy as np
import matplotlib.pyplot as plt
import matplotlib.gridspec as gridspec  # for unequal plot boxes
from linfit import linfit


t = np.array([0., 32.8, 65.6, 98.4, 131.2, 164., 196.8, 229.6, 262.4, 
              295.2, 328., 360.8, 393.6, 426.4, 459.2, 492.])
N = np.array([5.08, 3.29, 2.23, 1.48, 1.11, 0.644, 0.476, 0.273, 0.188, 
              0.141, 0.0942, 0.0768, 0.0322, 0.0322, 0.0198, 0.0198])
dN = np.array([0.11, 0.09, 0.07, 0.06, 0.05, 0.04, 0.03, 0.03,
               0.02, 0.02, 0.015, 0.014, 0.009, 0.009, 0.007, 0.007])


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
ax2.set_ylim(0.01, 10.)
for ax in [ax1, ax2]:
    ax.errorbar(t, N, yerr=dN, xerr=None, fmt='ro', ecolor='k', ms=3)
    ax.plot(tfit, Nfit, '-', color="gray", zorder=-1)
    ax.set_xlim(-10, 500)
    ax.set_xlabel('t')
    ax.set_ylabel('N')
    ax.text(0.95, 0.95,"$\\tau = {0:0.1f}\pm{1:0.1f}$\n$N_0 = {2:0.2f}\pm{3:0.2f}$"
         .format(tau, dtau, N0, dN0), fontsize=12, 
         ha='right', va='top', transform=ax.transAxes)
plt.show()