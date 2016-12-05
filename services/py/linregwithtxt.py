#immerueber Eingabeauffordung ausfuehren!!
import numpy as np
import matplotlib.pyplot as plt
import matplotlib.gridspec as gridspec  # for unequal plot boxes
from linfit import linfit


# data set for linear fitting

values = np.loadtxt("services/py/vorlage.txt", skiprows=1)
print(values)
x= values[:,0]
y= values[:,1]
dx= values[:,2]
dy = values[:,3]

labels = np.loadtxt("services/py/vorlage.txt", dtype="str")
print(labels)
labelx = labels[0,0]
labely = labels[0,1]

fit, cvm, info = linfit(x, y, sigmay=dy, relsigma=False, return_all=True)
dfit = [np.sqrt(cvm[i,i]) for i in range(2)]
print(u"slope = {0:0.3f} {1:0.3f}".format(fit[0], dfit[0]))
print(u"y-intercept = {0:0.3f} {1:0.3}".format(fit[1], dfit[1]))
# Open figure window for plotting data with linear fit
fig = plt.figure(1, figsize=(8,8))
#gs = gridspec.GridSpec(2, 1, height_ratios=[2.5, 6])

# Bottom plot: data and fit
ax1 = fig.add_subplot(1,1,1)

# Plot data with error bars
ax1.errorbar(x, y, yerr = dy , xerr = dx, ecolor="black", fmt="ro", ms=5)

# Plot fit (behind data)
endx = 0.05 * (x.max()-x.min())
xFit = np.array([x.min()-endx, x.max()+endx])
yFit = fit[0]*xFit + fit[1]
ax1.plot(xFit, yFit, "-b", zorder=-1)

# Print out results of fit on plot
ax1.text(0.05, 0.9,     # slope of fit
    u"slope = {0:0.3f} {1:0.3f}".format(fit[0], dfit[0]),
    ha="left", va="center", transform = ax1.transAxes)
ax1.text(0.05, 0.83,    # y-intercept of fit
    u"y-intercept = {0:0.3f} {1:0.3f}".format(fit[1], dfit[1]),
    ha="left", va="center", transform = ax1.transAxes)
ax1.text(0.05, 0.76,    # reduced chi-squared of fit
    "redchisq = {0:0.2f}".format(info.rchisq),
    ha="left", va="center", transform = ax1.transAxes)
ax1.text(0.05, 0.69,    # correlation coefficient of fitted slope & y-intercept
    "rcov = {0:0.2f}".format(cvm[0,1]/(dfit[0]*dfit[1])),
    ha="left", va="center", transform = ax1.transAxes)
# Label axes
ax1.set_xlabel(labelx)
ax1.set_ylabel(labely)
plt.savefig("dist/plot.png")
# plt.show()
