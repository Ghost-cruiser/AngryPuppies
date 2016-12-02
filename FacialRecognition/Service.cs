using MVVM_Library.Patterns;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MVVM.Library.Patterns
{
    public abstract class Service<T> : Singleton<T>
        where T : class, IServiceProvidable
    {
        public new static T Instance {
            get
            {
                _instance = Singleton<T>.Instance;

                if (_instance.Disposed)
                    _instance.Build();

                return _instance;
            }
        }

        public abstract bool Disposed { get; }

        public abstract void Build();
        public abstract void Dispose();
    }
}