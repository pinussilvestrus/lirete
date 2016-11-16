#immerueber Eingabeauffordung ausfuehren!!
import numpy as np
import matplotlib.pyplot as plt
import matplotlib.gridspec as gridspec  # for unequal plot boxes
from linfit import linfit


# data set for linear fitting 
y = np.array([1.77454, 6.00345, 11.75345, 14.233456, 22.2158473, 25.6383756, 
	33.74, 43.13,44.69, 50.25, 52.89, 57.81, 60.29])
x = np.array([0, 26.66, 66.65, 93.31, 133.3, 159.96, 199.95, 266.60, 293.26, 
	333.25, 359.91, 399.90, 453.22])
dy = np.array([0.08, 0.21, 0.39, 0.47, 0.73, 0.84, 1.11, 1.42, 1.47, 1.65, 
	1.74, 1.90, 1.98])
dx = np.array([0,7.031345888, 8.705298674, 10.290181, 13.03312031, 15.00186072, 
	18.07379941, 23.37054182, 25.52551322, 28.78232487, 30.96578475, 34.2546672, 38.65887511])	


fit, cvm, info = linfit(x, y, sigmay=dy, relsigma=False, return_all=True)
dfit = [np.sqrt(cvm[i,i]) for i in range(2)]
print(u"slope = {0:0.3f} \xb1 {1:0.3f}".format(fit[0], dfit[0]))
print(u"y-intercept = {0:0.3f} \xb1 {1:0.3}".format(fit[1], dfit[1]))
# Open figure window for plotting data with linear fit
fig = plt.figure(1, figsize=(8,8))
gs = gridspec.GridSpec(2, 1, height_ratios=[2.5, 6])

# Bottom plot: data and fit
ax1 = fig.add_subplot(gs[1])

# Plot data with error bars
ax1.errorbar(x, y, yerr = dy , xerr= dx ,ecolor="black", fmt="ro", ms=5)

# Plot fit (behind data)
endx = 0.05 * (x.max()-x.min())
xFit = np.array([x.min()-endx, x.max()+endx])
yFit = fit[0]*xFit + fit[1]
ax1.plot(xFit, yFit, "-b", zorder=-1)

# Print out results of fit on plot
ax1.text(0.05, 0.9,     # slope of fit
    u"slope = {0:0.3f} \xb1 {1:0.3f}".format(fit[0], dfit[0]),
    ha="left", va="center", transform = ax1.transAxes)
ax1.text(0.05, 0.83,    # y-intercept of fit
    u"y-intercept = {0:0.3f} \xb1 {1:0.3f}".format(fit[1], dfit[1]),
    ha="left", va="center", transform = ax1.transAxes)
ax1.text(0.05, 0.76,    # reduced chi-squared of fit
    "redchisq = {0:0.2f}".format(info.rchisq),
    ha="left", va="center", transform = ax1.transAxes)
ax1.text(0.05, 0.69,    # correlation coefficient of fitted slope & y-intercept
    "rcov = {0:0.2f}".format(cvm[0,1]/(dfit[0]*dfit[1])),
    ha="left", va="center", transform = ax1.transAxes)
A = fit[0] * 0.001 / 0.02
print(A) 
dA = A * ((0.00003/0.001)**2 + (0.28/20.08)**2 + (dfit[0]/fit[0])**2 )**1/2
print(dA)
ax1.text(0.05, 0.62,    # calculated hall constant
    "A = {0:0.4f}".format(A),
    ha="left", va="center", transform = ax1.transAxes)
# Label axes
ax1.set_xlabel("B[mT]")
ax1.set_ylabel("U[mv]")
plt.show()