#immerueber Eingabeauffordung ausfuehren!!
import numpy as np
import matplotlib.pyplot as plt
import matplotlib.gridspec as gridspec  # for unequal plot boxes
from linfit import linfit


# data set for linear fitting 
y = np.array([2.8, 5.2, 6.8, 9.6, 11.2, 14, 15.6, 17, 19.8, 21.4])
x = np.array([0, 2, 4, 6, 8, 10, 12, 14, 16, 18])
dy = np.array([1.0, 1.5, 1.2, 0.9, 1.4, 1.4, 1.5, 1.2, 1.3, 1.5])


fit, cvm, info = linfit(x, y, sigmay=dy, relsigma=False, return_all=True)
dfit = [np.sqrt(cvm[i,i]) for i in range(2)]
print(u"slope = {0:0.3f} \xb1 {1:0.3f}".format(fit[0], dfit[0]))
print(u"y-intercept = {0:0.3f} \xb1 {1:0.3}".format(fit[1], dfit[1]))
# Open figure window for plotting data with linear fit
fig = plt.figure(1, figsize=(7,7))
gs = gridspec.GridSpec(2, 1, height_ratios=[2.5, 6])

# Bottom plot: data and fit
ax1 = fig.add_subplot(gs[1])

# Plot data with error bars
ax1.errorbar(x, y, yerr = dy ,ecolor="black", fmt="ro", ms=5)

# Plot fit (behind data)
endx = 0.05 * (x.max()-x.min())
xFit = np.array([x.min()-endx, x.max()+endx])
yFit = fit[0]*xFit + fit[1]
ax1.plot(xFit, yFit, "-b", zorder=-1)

# Print out results of fit on plot
ax1.text(0.05, 0.9,     # slope of fit
    u"slope = {0:0.7f} \xb1 {1:0.3f}".format(fit[0], dfit[0]),
    ha="left", va="center", transform = ax1.transAxes)
ax1.text(0.05, 0.83,    # y-intercept of fit
    u"y-intercept = {0:0.7f} \xb1 {1:0.5f}".format(fit[1], dfit[1]),
    ha="left", va="center", transform = ax1.transAxes)
ax1.text(0.05, 0.76,    # reduced chi-squared of fit
    "redchisq = {0:0.7f}".format(info.rchisq),
    ha="left", va="center", transform = ax1.transAxes)
ax1.text(0.05, 0.69,    # correlation coefficient of fitted slope & y-intercept
    "rcov = {0:0.7f}".format(cvm[0,1]/(dfit[0]*dfit[1])),
    ha="left", va="center", transform = ax1.transAxes)   
# Label axes
ax1.set_xlabel("x[X]")
ax1.set_ylabel("y[Y]")
plt.show()