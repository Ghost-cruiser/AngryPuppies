using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MVVM_Library.Patterns
{
    public interface IServiceProvidable : IDisposable
    {
        bool Disposed { get; }
        void Build();
    }
}
